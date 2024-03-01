import unhappy from "../../assets/unhappy.png";
import "./EmptyState.css";

function NoConvos() {
  return (
    <div className="emptyContainer">
      <h2 className="emptyText">None</h2>{" "}
      <img className="emptyImage" src={unhappy} />
    </div>
  );
}

export default NoConvos;
