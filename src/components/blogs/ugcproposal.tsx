import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UGCProposalBlogPost = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Kollaborate July 2024 - UGC Proposal</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User-Generated Content (UGC) Proposal for Kollaborate.co: YouTube Shorts, TikTok & Instagram Reels</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Introduction</h3>
          <p className="mb-4">
            Kollaborate.co is a platform designed for creators, by creators. To showcase the incredible projects and collaborations happening on Kollaborate.co, we're launching a UGC initiative focused on short-form video content. We're looking for dynamic, engaging videos to attract new users and inspire our community.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside">
            <li><strong>Showcase Authentic Experiences:</strong> Highlight how creators use Kollaborate.co to bring their projects to life.</li>
            <li><strong>Drive Sign-ups:</strong> Encourage viewers to join the platform and start collaborating.</li>
            <li><strong>Increase Brand Awareness:</strong> Expand Kollaborate.co's reach through social media platforms.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Content Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">We encourage creative, eye-catching videos that are optimized for each platform:</p>
          <ul className="list-disc list-inside">
            <li><strong>YouTube Shorts:</strong> Vertical videos (9:16 aspect ratio) up to 60 seconds long.</li>
            <li><strong>TikTok:</strong> Vertical videos (9:16 aspect ratio) up to 10 minutes long.</li>
            <li><strong>Instagram Reels:</strong> Vertical videos (9:16 aspect ratio) up to 90 seconds long.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Content Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li><strong>Tutorials:</strong> Quick tips and tricks for using specific features or workflows.</li>
            <li><strong>Project Showcases:</strong> Highlight the creative process and final results of projects created on Kollaborate.co.</li>
            <li><strong>Behind-the-Scenes:</strong> Share glimpses of your collaborative work sessions.</li>
            <li><strong>Success Stories:</strong> Explain how Kollaborate.co has improved your creative process or project outcomes.</li>
            <li><strong>Challenges/Trends:</strong> Participate in trending challenges or create your own using relevant hashtags.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            By submitting your UGC, you grant Kollaborate.co a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, distribute, and display your content for marketing and promotional purposes. You retain ownership of your content and are free to use it elsewhere. Proper credit will be given whenever your content is used.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">We appreciate your valuable contributions!</p>
          <p className="mb-2">In the short term, you will get a free 2 year pro subscription to Kollaborate.</p>
          <p>Additionally we may provide:</p>
          <ul className="list-disc list-inside">
            <li>Featured placement on our social media channels or website.</li>
            <li>Shout-outs and recognition in our community.</li>
            <li>Exclusive access to new features or beta programs.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Submission Process</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">To submit your UGC, please send an email to <a href="mailto:anup@kollaborate.co" className="text-blue-600 hover:underline">anup@kollaborate.co</a> with the following:</p>
          <p className="mb-2">Or, you can DM us on https://x.com/GoKollaborate </p> 
          <ul className="list-disc list-inside">
            <li>A link to your video on YouTube, TikTok, or Instagram.</li>
            <li>A brief description of your content and how it relates to Kollaborate.co.</li>
            <li>Your social media handles (if applicable).</li>
          </ul>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Let's Kollaborate!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We're excited to see your unique perspective and creativity on display. Join us in showcasing the power of Kollaborate.co!</p>
        </CardContent>
      
      </Card>
      <Card className='mb-6 gap-y-4'>
        <CardHeader>
          <CardTitle>Script</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
        <p>Please use the product and you'll get the idea but basically, aim to cover the following:</p>
        <ol>
          <li>Purpose of Kollaborate -- This should be aimed towards sellers such as a SaaS sales executives, or YouTubers looking for brand sponsorships</li>
          <li>Account creation and using Brand Search - Remember our AI Search is the key feature for us!</li>
          <li>Bookmarking</li>
          <li>Represent me feature</li>
          <li>Email drafting using the /internal route</li>
          <li>Anything else you think stands out</li>
        </ol>
      </CardContent> 
      </Card>
    </div>
  );
};

export default UGCProposalBlogPost;