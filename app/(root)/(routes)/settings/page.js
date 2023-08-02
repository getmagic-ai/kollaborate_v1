import { Settings } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import JoinChannelButton from "@/components/JoinChannelButton";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-8'>
        <div className={"p-2 rounded-md w-fit"}>
          <Settings className={"w-10 h-10 text-gray-100"} />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-gray-100'>Settings</h1>
          <p className='text-sm text-gray-200'>Manage account settings.</p>
        </div>
      </div>
      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-gray-200 text-sm'>
          {isPro
            ? "You are currently on a Pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
        <JoinChannelButton className='ml-3' />
        
      </div>
    </div>
  );
};

export default SettingsPage;
