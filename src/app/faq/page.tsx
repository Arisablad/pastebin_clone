import { BarChart4, MessageSquareWarningIcon } from "lucide-react";

const RulesPage = () => {
  return (
    <div className="border-border border  h-min px-4 py-4 flex flex-col">
      <div className="flex justify-center items-center h-8 py-4 w-full gap-4">
        <MessageSquareWarningIcon className="w-8" />
        <p className="uppercase font-bold text-2xl">Rules</p>
      </div>

      <ul className="p-4 mt-4 border-red-600 border">
        <li className="text-2xl text-red-500/95 underline font-bold mb-4">
          Do not Post:
        </li>
        <li>- email lists</li>
        <li>- login details</li>
        <li>- stolen source code</li>
        <li>- hacked data</li>
        <li>- copyrighted information / data</li>
        <li>- password lists</li>
        <li>- banking / creditcard / financial information / data</li>
        <li>- personal information / data</li>
        <li>- pornographic information / data</li>
        <li>- spam links (this includes promoting your own site)</li>
      </ul>

      <p className="py-8">
        Broadly speaking, the site was created to help programmers. You are
        however welcome to post any type of text to Pastebin. Please do not post
        email lists, password lists or personal information. The report abuse
        feature can be used to flag such pastes and they will be deleted.
      </p>

      <div className="flex justify-center items-center h-8 py-4 w-full gap-4">
        <BarChart4 />
        <p className="uppercase font-bold text-2xl">Pros for Signed-In users</p>
      </div>

      <ul className="p-4 mt-4 border-red-600 border">
        <li>- You can create a private pastas</li>
        <li>- You can comment other pastas from your account</li>
        <li>- You ve got pastas dashboard access</li>
        <li>- You can remove comments for pastas</li>
        <li>- You can edit comments for pastas</li>
        <li>- You can remove your old pastas</li>
        <li>- You can find link to old pastas anytime</li>
      </ul>
    </div>
  );
};

export default RulesPage;
