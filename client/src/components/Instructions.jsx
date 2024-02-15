import twoMessageIcons from "../assets/aboutphoto4.jpg";
function Instructions() {
  return (
    <div className="instructionsParent">
      <div className="instructionsWrapper">
        <div className="instructionContainer">
          <div className="buttonContainer">
            <button className="instructionBulletPoint">1</button>
          </div>
          <div className="instructionText">
            <h3 className="instructionTitle">Find</h3>
            <p className="instructionWording">
              Use the search for friends bar to find people to chat with
            </p>
          </div>
        </div>
        <div className="instructionContainer">
          <div className="buttonContainer">
            <button className="instructionBulletPoint">2</button>
          </div>
          <div className="instructionText">
            <h3 className="instructionTitle">Follow</h3>
            <p className="instructionWording">
              Add your friends to see when they&#39;re online
            </p>
          </div>
        </div>
        <div className="instructionContainer">
          <div className="buttonContainer">
            <button className="instructionBulletPoint">3</button>
          </div>
          <div className="instructionText">
            <h3 className="instructionTitle">Chat</h3>
            <p className="instructionWording">
              Stay in touch with instant messaging
            </p>
          </div>
        </div>
      </div>
      <img src={twoMessageIcons} className="aboutImg" />
    </div>
  );
}

export default Instructions;
