function Inscrutions() {
  return (
    <div className="instructionsWrapper">
      <div className="instructionContainer">
        <button className="instructionBulletPoint">1</button>
        <div className="instructionText">
          <h3 className="instructionTitle">Find</h3>
          <p className="instructionWording">
            Use the search for friends bar to find people to chat with
          </p>
        </div>
      </div>
      <div className="instructionContainer">
        <button className="instructionBulletPoint">2</button>
        <div className="instructionText">
          <h3 className="instructionTitle">Follow</h3>
          <p className="instructionWording">
            Add your friends to see when they&#39;re online
          </p>
        </div>
      </div>
      <div className="instructionContainer">
        <button className="instructionBulletPoint">3</button>
        <div className="instructionText">
          <h3 className="instructionTitle">Chat</h3>
          <p className="instructionWording">
            Stay in touch with instant messaging
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inscrutions;
