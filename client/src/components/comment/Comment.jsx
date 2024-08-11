import trashIcon from "../../assets/trash.svg";
import { useAuthContext } from "../../context/AuthContext";
import UserLink from "../user/UserLink";
import { formatDistanceToNow } from "date-fns";
const Comment = ({ comment }) => {
  const { authUser } = useAuthContext();
  return (
    <div className="border-b border-secondary border-opacity-50 py-2 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserLink user={comment.author} />
          <p>|</p>
          <p className="opacity-50 text-sm">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>

        {authUser._id === comment.author._id && (
          <button>
            <img src={trashIcon} alt="Delete comment" />
          </button>
        )}
      </div>

      <p className="p-2">{comment.comment}</p>
    </div>
  );
};

export default Comment;
