'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Company {
  name: string
}

interface EmailBodyProps {
  company: Company['name']
  recipientName: string
  callToAction: 'demo' | 'learnMore'
  instructions: string
  template: string
}

const KollaborateEmailComponent = () => {
  const [company, setCompany] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [callToAction, setCallToAction] = useState<EmailBodyProps['callToAction']>('demo')
  const [instructions, setInstructions] = useState('Write an initial outreach email to the above brand introducing Kollaborate which helps companies get affordable and measurable exposure to their target audience by quickly integrating them in top creator\'s content across their YouTube, podcast (audio) and other social channels. Then describe how we could get the company brand exposure quickly and exactly on target, in a low cost with a YouTube collaboration. Avoid using the word influencer and use \'Creators\' instead. Make the email sound more natural and less formal.')
  const [template, setTemplate] = useState('YouTube + Podcast + IG Creator to specific brand outreach')
  const [emailBody, setEmailBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateEmail = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('https://discord-bot-lambda-t5kwbdtkkq-uc.a.run.app/prompt', {
        company,
        optional_user_pitch: "Write an initial outreach email to the above brand introducing Kollaborate which helps companies get affordable and measurable exposure to their target audience by quickly integrating them in top creator's content across their YouTube, podcast (audio) and other social channels. Then describe how we could get the company brand exposure quickly and exactly on target, in a low cost with a YouTube collaboration. Avoid using the word influencer and use 'Creators' instead. Make the email sound more natural and less formal."
     
      })
      setEmailBody(response.data.response)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailBody)
  }

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="company">
          Company Name:
        </label>
        <input
          className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="recipientName">
          Recipient Name:
        </label>
        <input
          className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          type="text"
          id="recipientName"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="callToAction">
          Call to Action:
        </label>
        <select
          className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          id="callToAction"
          value={callToAction}
          onChange={(e) => setCallToAction(e.target.value as EmailBodyProps['callToAction'])}
        >
          <option value="learnMore">Learn More</option>
          <option value="demo">Schedule a Demo</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="template">
          Email Template:
        </label>
        <select
          className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          id="template"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option value="YouTube Only Creator to specific brand outreach">
            YouTube Only Creator
          </option>
          <option value="YouTube + Podcast + IG Creator to specific brand outreach">
            YouTube + Podcast + IG Creator
          </option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="instructions">
          Instructions:
        </label>
        <textarea
          className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={4}
        />
      </div>

      <button
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateEmail}
      >
        Generate Email
      </button>

      {isLoading ? (
        <p className='text-white'>Loading...</p>
      ) : (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="emailBody">
            Email Draft:
          </label>
          <div className="flex items-center">
            <div className="w-full">
              <textarea
                className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                id="emailBody"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={10}
              />
            </div>
            <button
              className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCopyEmail}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default KollaborateEmailComponent

// ` ${recipientName},
// I'm reaching out from Kollaborate, a platform that helps companies like ${company} gain affordable and measurable exposure to their target audience. We achieve this by integrating you with top Creators across YouTube, podcasts, and other social channels.
// Imagine getting your brand in front of the exact audience you want, quickly and efficiently, through a YouTube collaboration? With Kollaborate, it's possible, and at a fraction of the cost of traditional marketing methods.
// Are you interested in learning more about how Kollaborate can help ${company} achieve its marketing goals?
// ${callToAction === 'demo' ? 'Click here to schedule a demo:' : ''} [Link to demo]
// Best regards,
// The Kollaborate Team
// P.S. By the way, to focus on the most relevant creators for your target audience, would you be interested in exploring options across YouTube, podcasts, and social media?`,