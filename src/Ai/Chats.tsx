import {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect
} from "react";
import { useValue, usingValue } from "../../Contaxt";
import axios from "axios";
import Typewriter from "typewriter-effect";
const scaneFileUrl = import.meta.env.VITE_API_SCAN_FILE;
const extractInfoUrl = import.meta.env.VITE_API_GET_INFO;

const Chats = forwardRef((props: any, ref: any) => {
  const { setValue, closeChat } = useValue() as usingValue;
  const [messages, setMessages] = useState<any>(["Welcome to the chat!"]);
  // const [messagesLength, setMessagesLength] = useState<number>(1);//debug

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    chatContainerRef.current!.scrollTop =
      chatContainerRef.current!.scrollHeight;
  };

  async function fetchRepoData(user: string, repo: string) {
    const response = await fetch(
      `https://api.github.com/repos/${user}/${repo}`
    );
    const data = await response.json();
    const contentResponse = await fetch(
      `https://api.github.com/repos/${user}/${repo}/contents`
    );
    const contentData = await contentResponse.json();
    const default_branch = data.default_branch;
    return { ...data, content: contentData, default_branch };
  }

  function analyzeRepo(repoData: any) {
    const hasPackageJson = repoData.content.some(
      (file: any) => file.name === "package.json"
    );
    const hasLicense = repoData.content.some((file: any) =>
      file.name.toUpperCase().startsWith("LICENSE")
    );
    const usage = repoData.description;
    return { hasPackageJson, hasLicense, usage };
  }

  async function generateReadme(user: string, repo: string) {
    const repoData = await fetchRepoData(user, repo);
    const analysis = analyzeRepo(repoData);
    const readme = {
      title: `# ${repoData.name}`,
      description: repoData.description
        ? `\n## Description\n\n${"- " + repoData.description}`
        : "",
      branch: `\n## Branch\n\n${"### " + repoData.default_branch}`,
      installation: analysis.hasPackageJson
        ? "\n## Installation\n\nRun `npm install` to install dependencies."
        : "",
      usage: analysis.usage ? `\n## Usage\n\n${analysis.usage}` : "",
      contributing:
        "\n## Contributing\n\nPull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.",
      license: analysis.hasLicense
        ? "\n## License\n\nThis project is licensed under the terms of the LICENSE file."
        : "MIT"
    };

    const readmeMarkdown = Object.values(readme).join("\n");
    setValue(readmeMarkdown);
  }
  const [aiReplyMessage, setAiReplyMessage] = useState<string>("");
  useImperativeHandle(ref, () => ({
    sendMessage(message: any) {
      const file: any = message.target?.files![0];
      if (file) {
        const readFile = async () => {
          const fileType: string = file.name.split(".").pop();
          const popularFormats = ["pdf", "xml", "html", "txt"];
          const setMessagesWithDelay = (
            prevMessages: any,
            message: any,
            delay: number
          ) => {
            setTimeout(() => {
              console.log(!prevMessages?"send failed":"send success");//debug
              setMessages((prevMessages: any) => [...prevMessages, message]);
            }, delay);
          };
          setMessagesWithDelay(messages, `: Scanning file`, 2500);

          if (!popularFormats.includes(fileType)) {
            setMessagesWithDelay(messages, `: Unsupported file format`, 2000);
            setMessagesWithDelay(
              messages,
              `: sorry :( 
        only pdf, html, xml and txt files are supported for now`,
              3000
            );
            return;
          }
          if (file.size > 5000000) {
            setMessagesWithDelay(messages, `: File size exceeds`, 2000);
            setMessagesWithDelay(messages, `Only 2MB allowed for now`, 2000);
            return;
          }
          setMessagesWithDelay(messages, `: Supported format`, 3500);
          setMessagesWithDelay(messages, `: Extracting data`, 5000);

          const formData = new FormData();
          formData.append("file", file);
          const response = await axios.post(
            `${scaneFileUrl}${fileType}`,
            formData
          );
          // console.log(response.data.content.text);
          const mark: any = {
            title: `# ${
              response.data.description
                ? response.data.description.split(".").shift()
                : "Title"
            }`,
            content: `# ${
              response.data.content?.text ? response.data.content.text : "Title"
            }`
          };
          const readmeMarkdown = Object.values(mark).join("\n");
          setValue(readmeMarkdown);
          setMessagesWithDelay(
            messages,
            `File read Completed generating markdown for you`,
            7000
          );
          setMessagesWithDelay(
            messages,
            `Successfully created markdown file`,
            10000
          );
        };

        readFile();
        return;
      }

      scrollToBottom();
      setMessages((prevMessages: any) => [...prevMessages, `You:  ${message}`]);
      // setMessagesLength(messages.length);//debug
      const githubLinkRegex = /https:\/\/github\.com\/[^\/]+\/[^\/]+/;
      const githubLinkMatch = message.match(githubLinkRegex);

      if (githubLinkMatch) {
        const githubLink = githubLinkMatch[0];
        const [user, repo] = githubLink
          .replace("https://github.com/", "")
          .split("/");

        try {
          generateReadme(user, repo);
          setMessages((prevMessages: any) => [
            ...prevMessages,
            `Here's a README for the repository:`
          ]);
          setTimeout(() => closeChat(), 2500);
        } catch (error: any) {
          setMessages((prevMessages: any) => [
            ...prevMessages,
            "<span style={{color:'red'}}></span>: I could not open the link. Please make sure it is a valid GitHub repository link."
          ]);
        }
      } else {
        let setTime1: any, setTime2: any, setTime3: any;

        const setMessagesWithDelay = (
          prevMessages: any,
          message: any,
          delay: number
        ) => {
          setTimeout(() => {
            console.log(!prevMessages);
            setMessages((prevMessages: any) => [...prevMessages, message]);
          }, delay);
        };

        setMessagesWithDelay(messages, `: analyzing user input`, 2500);

        async function getRes() {
          try {
            const response = await axios.post(extractInfoUrl, {
              text: props.inputText
            });
            // console.log(response);//debug
            if (
              response.data.AiAnswer.answer.score >= 0.7 &&
              response.data.AiAnswer.answer.intent !== "no.bot"
            ) {
              setMessagesWithDelay(
                messages,
                `${
                  response.data.AiAnswer.answer.answer ||
                  "Could not understand please describe accuratly"
                }`,
                5000
              );
            } else {
              setMessagesWithDelay(messages, `: searching web`, 5000);
              setMessagesWithDelay(messages, `: generating markdown`, 7500);
              setMessagesWithDelay(
                messages,
                `markdown generating... , open editor after completation boss, be carefull owr chats will be deleted immediately :)`,
                10000
              );
              setTimeout(() => {}, 15000);
            }
            // console.log(response.data.google.results);//debug
            setValue(
              response.data.google.results[0]?.description || "server error"
            );

            const mark = {
              title: `# ${response.data.google.results[0]?.title || "title"}`,
              subtitle1: `## ${response.data.google.results[2]?.title || ""}`,
              subtitle2: `## ${response.data.google.results[4]?.title || ""}`,
              description1: response.data.google.results[1]?.description
                ? `\n\n${"- " + response.data.google.results[1].description}`
                : "",
              subtitle3: `# ${response.data.google.results[2]?.title || ""}`,
              description2: response.data.google.results[2]?.description
                ? `\n\n${
                    "- " + response.data.google.results[2].description || ""
                  }`
                : "",
              branch: `\n\n${
                "### " + response.data.google.results[1]?.description || ""
              }`,
              installation: response.data.google.results[3]?.url
                ? "\n## conclusion\n\n`write about your project here`"
                : ""
            };

            const readmeMarkdown = Object.values(mark).join("\n");
            setValue(readmeMarkdown);
          } catch (error: any) {
            setAiReplyMessage("could not generate response right now");
            setMessagesWithDelay(messages, `${aiReplyMessage}`, 15000);
            clearTimeout(setTime1);
            clearTimeout(setTime2);
            clearTimeout(setTime3);
            console.log(error);
          }
        }

        getRes();
      }
    }
  }));

  interface Type {
    width?: string;
    height?: string;
    color?: string;
    textAlign?: any;
    backgroundColor?: string;
    backdropFilter?: string;
    borderTopRightRadius?: string;
    borderTopLeftRadius?: string;
    transform?: string;
    fontSize?: string;
    padding?: string;
    margin?: string;
    overflow?: string;
  }
  const aiReplyStyle: Type = {
    color: "#4f4f4f85",
    textAlign: "left",
    backgroundColor: "white",
    backdropFilter: "blur(10px) saturate(70%)",
    borderTopRightRadius: "20px",
    transform: "translateX(0%)"
  };
  const userMsgStyle: Type = {
    color: "#4f4f4f85",
    textAlign: "right",
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    transform: "translateX(10%)"
  };
  const loadingStyle: Type = {
    color: "red",
    textAlign: "left",
    backgroundColor: "transparent",
    width: "90%",
    borderTopLeftRadius: "20px",
    height: "30px",
    fontSize: "0.8rem",
    padding: "0",
    margin: "0",
    overflow: "visible"
  };

  useEffect(() => {
    const settingInterval = setInterval(() => {
      scrollToBottom();
    }, 2000);
    return () => {
      clearInterval(settingInterval);
    };
  }, []);
  return (
    <div className="chats" ref={chatContainerRef}>
      {messages.map((message: any, index: any) => (
        <div
          style={
            message.split(" ").includes("You:")
              ? userMsgStyle
              : message.split(" ").includes(":")
              ? loadingStyle
              : aiReplyStyle
          }
          key={index}
        >
          {!message.split(" ").includes("You:") ? (
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString(message)
                  .callFunction(() => {
                    // console.log('String typed out!');
                  })
                  .pauseFor(2000)
                  // .deleteAll()
                  .callFunction(() => {
                    // console.log('All strings were deleted');
                  })
                  .start();
              }}
            />
          ) : message.split(" ").includes(":") ? (
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString(message)
                  .callFunction(() => {})
                  .pauseFor(300)
                  .deleteChars(10);
                typewriter
                  .typeString("success")
                  .callFunction(() => {})
                  .start();
              }}
            />
          ) : (
            message
          )}
        </div>
      ))}
    </div>
  );
});
export default Chats;