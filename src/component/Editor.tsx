function Editor(props:any) {
  return (
    <>
      <div className="input">
        <textarea id="editor" className="textarea" onChange={props.handleChange}>
          {props.code}
        </textarea>
      </div>
    </>
  );
}

export default Editor;