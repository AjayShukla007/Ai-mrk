import ReactMarkdown from 'react-markdown';

function Preview(props:any) {
  return (
  <>
  <div className="outPut">
        <div id="preview">
        <ReactMarkdown>
          {props.code}
        </ReactMarkdown>
        </div>
      </div>
  </>
  )
}

export default Preview;