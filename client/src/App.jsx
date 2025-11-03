import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: "Understanding Artificial Intelligence",
      summary: "AI is transforming industries and the way we live. Learn how AI works and its potential impacts.",
      content: `Artificial Intelligence (AI) refers to systems capable of performing tasks that require human-like intelligence — such as visual perception, speech recognition, and decision-making.
      The technology uses algorithms, machine learning models, and data to improve its accuracy and effectiveness over time.
      Applications range from healthcare and education to manufacturing and autonomous driving.
      For deeper reading, visit: [IBM AI Explained](https://www.ibm.com/cloud/learn/what-is-artificial-intelligence).`,
    },
    {
      id: 2,
      title: "Getting Started with Web Development",
      summary: "A complete beginner’s roadmap to becoming a web developer in 2025.",
      content: `Web development combines creativity and logic. You’ll need to learn HTML, CSS, and JavaScript before moving into frameworks like React or backend tools like Node.js.
      Build small projects as you learn — such as personal portfolios and to-do apps.
      Recommended resource: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn).`,
    },
    {
      id: 3,
      title: "Blockchain for Beginners",
      summary: "Understand how blockchain ensures transparency and security in digital systems.",
      content: `A blockchain is a distributed ledger system that stores data in blocks connected chronologically.
      It ensures transparency, immutability, and decentralization — ideal for systems that require data integrity.
      Explore: [Ethereum Documentation](https://ethereum.org/en/developers/docs/).`,
    },
    {
      id: 4,
      title: "Mastering React.js",
      summary: "React helps developers build scalable and efficient UIs. Learn how to start with components and hooks.",
      content: `React is a JavaScript library for building user interfaces using a component-based architecture.
      Key concepts include JSX, props, state, and lifecycle methods.
      To dive deeper, visit [React Docs](https://react.dev/learn).`,
    },
    {
      id: 5,
      title: "The Power of Cloud Computing",
      summary: "Discover how cloud computing changed modern IT infrastructure.",
      content: `Cloud computing allows storage, computation, and networking resources over the internet.
      Major providers include AWS, Azure, and Google Cloud.
      Learn more: [AWS Cloud Overview](https://aws.amazon.com/what-is-cloud-computing/).`,
    },
    {
      id: 6,
      title: "Data Science Simplified",
      summary: "How to start your journey into the world of data analysis and AI.",
      content: `Data Science involves extracting insights from data using Python, R, and visualization tools.
      Explore libraries like pandas, NumPy, and matplotlib.
      More reading: [Kaggle Learn](https://www.kaggle.com/learn).`,
    },
    {
      id: 7,
      title: "Cybersecurity Essentials",
      summary: "Stay safe online with these best security practices.",
      content: `Cybersecurity protects systems, networks, and data from attacks.
      Common practices include strong passwords, two-factor authentication, and software updates.
      Explore: [Cybersecurity Guide by Cisco](https://www.cisco.com/c/en/us/products/security/what-is-cybersecurity.html).`,
    },
    {
      id: 8,
      title: "Internet of Things (IoT) Explained",
      summary: "How connected devices are shaping smart cities and homes.",
      content: `IoT refers to a network of connected physical devices that exchange data.
      Examples: smart lights, wearables, and industrial sensors.
      Learn more: [Microsoft IoT Overview](https://azure.microsoft.com/en-us/overview/internet-of-things-iot/).`,
    },
    {
      id: 9,
      title: "Machine Learning in Everyday Life",
      summary: "From recommendations to fraud detection — ML is everywhere.",
      content: `Machine Learning uses statistical models to make predictions from data.
      It powers technologies like Netflix recommendations and spam filters.
      Explore: [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course).`,
    },
    {
      id: 10,
      title: "Mobile App Development Trends 2025",
      summary: "Discover what’s shaping mobile apps this year.",
      content: `Trends include cross-platform frameworks (Flutter, React Native), AI chatbots, and 5G-powered apps.
      Read more: [TechCrunch Mobile Trends](https://techcrunch.com/tag/mobile/).`,
    },
    {
      id: 11,
      title: "Version Control with Git and GitHub",
      summary: "A developer’s guide to collaboration and version management.",
      content: `Git allows developers to track code changes. GitHub adds remote repositories for collaboration.
      Learn more: [Git Handbook](https://guides.github.com/introduction/git-handbook/).`,
    },
    {
      id: 12,
      title: "Responsive Web Design",
      summary: "Create beautiful, adaptive websites using CSS and frameworks like Tailwind.",
      content: `Responsive design ensures that websites adjust to any screen size using flexible grids and media queries.
      Learn: [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/).`,
    },
    {
      id: 13,
      title: "Career Growth in Tech",
      summary: "Tips on continuous learning and staying competitive.",
      content: `Build projects, contribute to open source, and keep learning.
      Soft skills like communication and problem-solving are equally vital.
      Explore: [LinkedIn Learning Paths](https://www.linkedin.com/learning/).`,
    },
    {
      id: 14,
      title: "APIs and RESTful Services",
      summary: "The backbone of modern web apps.",
      content: `APIs enable software to communicate. REST APIs use HTTP methods like GET and POST for data exchange.
      Learn more: [REST API Tutorial](https://restfulapi.net/).`,
    },
    {
      id: 15,
      title: "UI/UX Design Principles",
      summary: "Make users love your app through intuitive and elegant design.",
      content: `UI focuses on aesthetics; UX ensures usability.
      Great designs are simple, consistent, and user-focused.
      Learn more: [Nielsen Norman Group on UX](https://www.nngroup.com/).`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Tech Insight Blog</h1>
          <div className="space-x-6">
            <button onClick={() => setSelectedPost(null)} className="hover:text-gray-200 transition">Home</button>
            <a href="#footer" className="hover:text-gray-200 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Posts Grid */}
      <main className="flex-grow container mx-auto p-6">
        {!selectedPost ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-5 transition transform hover:-translate-y-2"
              >
                <h2 className="text-xl font-semibold mb-2 text-indigo-700">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">{selectedPost.title}</h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">{selectedPost.content}</p>
            <button
              onClick={() => setSelectedPost(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              ← Back
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-gray-300 text-center py-6">
        <p>© 2025 Tech Insight Blog | Built with 💻 by Sydney Wesonga</p>
        <p>
          Explore more:{" "}
          <a href="https://github.com/Wales254" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-200">
            GitHub Profile
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
