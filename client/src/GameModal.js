import React from "react";

export default function GameModal() {
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [viewMore, setViewMore] = useState(false);

  const submitComment = async (comment) => {
    setUpdatePage(!updatePage);
    await fetch(`/comment/${game._id}`, {
      method: "PUT",
      body: JSON.stringify({
        comment: comment,
        commentBy: currentUser._id,
        pic: currentUser.picture,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Gotten here");

        res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>GameModal</div>
    //     <CommentsSection>
    //     {game.comments.length > 2 && (
    //       <View
    //         onClick={() => {
    //           setViewMore(!viewMore);
    //         }}
    //       >
    //         {viewMore ? "View Less Comments" : "View More Comments"}
    //       </View>
    //     )}
    //     {game.comments.map((comment, index) => {
    //       if (index >= game.comments.length - 2 && !viewMore) {
    //         return <Comment key={Math.random() * 999999} comment={comment} />;
    //       } else if (viewMore) {
    //         return <Comment key={Math.random() * 999999} comment={comment} />;
    //       }
    //     })}
    //     <CreateComment>
    //       <CommentInput
    //         placeholder="comment"
    //         onChange={(ev) => {
    //           setComment(ev.target.value);
    //           setInputValue(ev.target.value);
    //         }}
    //         value={inputValue}
    //       ></CommentInput>
    //       <Submit
    //         onClick={() => {
    //           submitComment(comment);
    //           setInputValue("");
    //         }}
    //       >
    //         Comment
    //       </Submit>
    //     </CreateComment>
    //   </CommentsSection>
  );
}

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const CreateComment = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  padding: 0 0 5px;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
`;

const CommentInput = styled.textarea`
  margin-left: 4px;
  border-radius: 7px;
  width: 77%;
  resize: none;
  @media (min-width: 769px) {
    /* width: 70%; */
  }
`;

const Submit = styled.button`
  margin-left: 6px;
  border-radius: 6px;
  background: #e8e6df;
  border: none;
  height: 30px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.7);
  background-color: #07024d;
  border-radius: 9px 9px 9px 0;
  /* color: #5a7bb0; */
  color: #d3d2d9;
`;

const View = styled.button`
  all: unset;
  color: #e8e6df;
  background-color: none;
  background: none;
  border: none;
  font-size: 14px;
  padding: 0;
  /* margin: 0; */
  /* align-self: center; */

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 650px) {
    font-size: 16px;
  }
`;
