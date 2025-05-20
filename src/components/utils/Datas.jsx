import LockIcon from "@mui/icons-material/Lock";
import LoopIcon from "@mui/icons-material/Loop";
import SecurityIcon from "@mui/icons-material/Security";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

export const cardsData = [
  {
    icon: <LockIcon fontSize="large" className="text-black" />,
    title: "Simplify your\n toolchain",
    description: (
      <>
        All the{" "}
        <span className="text-purple-600 underline cursor-pointer">
          essential DevSecOps tools
        </span>{" "}
        in one place.
      </>
    ),
    button: null,
  },
  {
    icon: <LoopIcon fontSize="large" className="text-black" />,
    title: "Accelerate\nsoftware delivery",
    description: (
      <>
        Automation,{" "}
        <span className="text-purple-600 underline cursor-pointer">
          AI-powered workflows
        </span>
        , and more.
      </>
    ),
    button: "Try Code Suggestions",
  },
  {
    icon: <SecurityIcon fontSize="large" className="text-black" />,
    title: "Integrate security",
    description: (
      <>
        Security that’s{" "}
        <span className="text-purple-600 underline cursor-pointer">
          built in, not bolted on.
        </span>
      </>
    ),
    button: "Try CI/CD",
  },
  {
    icon: <CloudQueueIcon fontSize="large" className="text-black" />,
    title: "Deploy anywhere",
    description: (
      <>
        Say goodbye to cloud{" "}
        <span className="text-purple-600 underline cursor-pointer">
          vendor lock-in.
        </span>
      </>
    ),
    button: null,
  },
];
