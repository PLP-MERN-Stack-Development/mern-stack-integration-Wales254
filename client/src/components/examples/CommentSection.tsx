import CommentSection from "../CommentSection";

export default function CommentSectionExample() {
  const comments = [
    {
      id: "1",
      content: "Great article! This really helped me understand the concepts better.",
      author: {
        id: "user-1",
        name: "Alex Chen",
        profilePicture: "https://i.pravatar.cc/150?img=3"
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 5,
      replies: [
        {
          id: "2",
          content: "I agree! The examples were really helpful.",
          author: {
            id: "user-2",
            name: "Maria Garcia",
            profilePicture: "https://i.pravatar.cc/150?img=5"
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60),
          likes: 2,
        }
      ]
    },
    {
      id: "3",
      content: "Could you elaborate more on the advanced patterns section?",
      author: {
        id: "user-3",
        name: "John Smith",
        profilePicture: "https://i.pravatar.cc/150?img=8"
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      likes: 1,
    }
  ];

  const currentUser = {
    id: "current-user",
    name: "You",
    profilePicture: "https://i.pravatar.cc/150?img=12"
  };

  return (
    <div className="max-w-3xl">
      <CommentSection comments={comments} currentUser={currentUser} />
    </div>
  );
}
