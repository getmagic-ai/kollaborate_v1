"use client";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const InviteUserEmail = () => {
  const previewText = `Join Kollaborate`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width='40'
                height='37'
                alt='Vercel'
                className='my-0 mx-auto'
              />
            </Section>
            <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
              Join <strong>Kollaborate</strong>
            </Heading>
            <Text className='text-black text-[14px] leading-[24px]'>
              Hello,
            </Text>

            <Section className='text-center mt-[32px] mb-[32px]'>
              <Button
                pX={20}
                pY={12}
                className='bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center'
                href={baseUrl}
              >
                Join the team
              </Button>
            </Section>
            <Text className='text-black text-[14px] leading-[24px]'>
              or copy and paste this URL into your browser:{" "}
              <Link href={baseUrl} className='text-blue-600 no-underline'>
                {baseUrl}
              </Link>
            </Text>
            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteUserEmail;
