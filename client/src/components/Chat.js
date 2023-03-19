import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import bot from "../assets/bot.png";
import user from "../assets/user.png";
import loadingIcon from "../assets/loader.svg";
const Chat = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.querySelector(".layout").scrollTop =
      document.querySelector(".layout").scrollHeight;
  }, [posts]);

  const fetchBotResponse = async () => {
    const { data } = await axios.post(
      "https://bunnu.onrender.com",
      { input },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const autoTypingBotResponse = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setPosts((prevState) => {
          let lastItem = prevState.pop();
          if (lastItem.type !== "bot") {
            prevState.push({
              type: "bot",
              post: text.charAt(index - 1),
            });
          } else {
            prevState.push({
              type: "bot",
              post: lastItem.post + text.charAt(index - 1),
            });
          }
          return [...prevState];
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const onSubmit = () => {
    if (input.trim() === "") return;
    updatePosts(input);
    updatePosts("loading...", false, true);
    setInput("");
    fetchBotResponse().then((res) => {
      updatePosts(res.bot.trim(), true);
    });
  };

  const updatePosts = (post, isBot, isLoading) => {
    if (isBot) {
      autoTypingBotResponse(post);
    } else {
      setPosts((prevState) => {
        return [
          ...prevState,
          {
            type: isLoading ? "loading" : "user",
            post,
          },
        ];
      });
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      onSubmit();
    }
  };

  return (
    <div className="md:pl-[260px] h-screen w-full flex flex-col bg-[#343541] ">
      <Navbar />
      <div className="h-full layout  relative p-3 md:p-10 flex flex-col gap-8 overflow-x-hidden overflow-y-auto text-white z-20">
        {posts.map((post, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              post.type === "bot" || post.type === "loading" ? "bot" : ""
            }`}
          >
            <div className="avatar">
              <img
                src={
                  post.type === "bot" || post.type === "loading" ? bot : user
                }
              />
            </div>
            {post.type === "loading" ? (
              <div className="loader">
                <img src={loadingIcon} />
              </div>
            ) : (
              <div className="post">{post.post}</div>
            )}
          </div>
        ))}
      </div>
      <div className="relative mt-auto p-3 md:p-10 ">
        <input
          value={input}
          autoFocus
          type="text"
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={onKeyUp}
          className="w-full px-5 py-3 rounded-md bg-[#40414f] text-white outline-none shadow-[0_0_15px_rgba(0,0,0,0.10)]"
          placeholder="Ask Anything..."
        />
        <PaperAirplaneIcon className="w-5 h-5 absolute right-8 top-[1.6rem] md:right-12 md:top-14 cursor-pointer text-white/50 " />
      </div>
    </div>
  );
};

export default Chat;
