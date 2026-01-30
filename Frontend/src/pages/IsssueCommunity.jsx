import { useEffect, useState } from "react";
import { useCommunityStore } from "../store/useCommunityStore";

const reactions = ["like", "love", "fire", "angry", "sad"];

const IssueCommunity = ({ issueId }) => {
  const {
    comments,
    reactions: reactionStats,
    fetchComments,
    fetchReactions,
    addComment,
    toggleReaction,
  } = useCommunityStore();

  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments(issueId);
    fetchReactions(issueId);
  }, [issueId]);

  const submitComment = async () => {
    if (!text.trim()) return;
    await addComment({
      parentType: "Issue",
      parentId: issueId,
      message: text,
    });
    setText("");
    fetchComments(issueId);
  };

  return (
    <div className="bg-white rounded-2xl p-5 mt-6 shadow">

      <div className="flex gap-2 mb-4">
        {reactions.map((r) => (
          <button
            key={r}
            onClick={() =>
              toggleReaction({ parentType: "Issue", parentId: issueId, type: r })
            }
            className="px-3 py-1 rounded-full bg-slate-100 text-xs"
          >
            {r} {reactionStats.find((x) => x._id === r)?.count || 0}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c._id} className="bg-slate-50 p-3 rounded-xl">
            <p className="text-sm font-medium">{c.createdBy?.name}</p>
            <p className="text-xs text-slate-600">{c.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add your comment..."
          className="flex-1 h-10 px-4 rounded-xl border"
        />
        <button
          onClick={submitComment}
          className="px-4 rounded-xl bg-indigo-600 text-white"
        >
          Post
        </button>
      </div>

    </div>
  );
};

export default IssueCommunity;
