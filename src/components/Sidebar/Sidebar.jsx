import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { Tooltip } from "react-tooltip";
const Sidebar = () => {
  const [extended, setExtended] = React.useState(true);
  const { onSent, prevPrompts, setRecentPrompt, newChat } =
    React.useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  let sidebarWidth;
  if (!extended) {
    sidebarWidth = "20%";
  } else {
    sidebarWidth = "70px";
  }
  return (
    <div className="sidebar" style={{ width: sidebarWidth }}>
      <div className="top">
        <img
          onClick={() => {
            setExtended(!extended);
          }}
          className="menu"
          src={assets.menu_icon}
          alt=""
          data-tooltip-id="menu"
          data-tooltip-content={extended ? "Expand" : "Collapse"}
        />
        <Tooltip
          id="menu"
          place={"bottom"}
          style={{ padding: "5px", fontSize: "12px", color: "#f0f4f9" }}
        />
        <div
          onClick={() => newChat()}
          className="new-chat"
          data-tooltip-id="new-chat"
          data-tooltip-content="New Chat"
        >
          <img src={assets.plus_icon} alt="" />
          <Tooltip
            id="new-chat"
            place={"bottom"}
            style={{ padding: "5px", fontSize: "12px", color: "#f0f4f9" }}
          />
          {!extended && <p>New Chat</p>}
        </div>
        {!extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>
                    {item.slice(0, 24)} {item.length > 24 && "..."}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {!extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {!extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {!extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
