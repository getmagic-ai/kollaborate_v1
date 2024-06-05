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
}

const KollaborateEmailComponent = () => {
  const [company, setCompany] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [callToAction, setCallToAction] = useState<EmailBodyProps['callToAction']>('demo')
  const [emailBody, setEmailBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('https://discord-bot-lambda-t5kwbdtkkq-uc.a.run.app/prompt', {
        company,
        optional_user_pitch: `Hi ${recipientName},

I'm reaching out from Kollaborate, a platform that helps companies like ${company} gain affordable and measurable exposure to their target audience. We achieve this by integrating you with top Creators across YouTube, podcasts, and other social channels.

Imagine getting your brand in front of the exact audience you want, quickly and efficiently, through a YouTube collaboration? With Kollaborate, it's possible, and at a fraction of the cost of traditional marketing methods.

Are you interested in learning more about how Kollaborate can help ${company} achieve its marketing goals?

${callToAction === 'demo' ? 'Click here to schedule a demo:' : ''} [Link to demo] 

Best regards,

The Kollaborate Team

P.S. By the way, to focus on the most relevant creators for your target audience, would you be interested in exploring options across YouTube, podcasts, and social media?`,
      })
      setEmailBody(response.data.body)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchEmailBody = async () => {
      if (company) {
        await handleSubmit()
      }
    }
    fetchEmailBody()
  }, [company])

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
      {/* ... rest of the component JSX */}
    </div>
  )
}

export default KollaborateEmailComponent
