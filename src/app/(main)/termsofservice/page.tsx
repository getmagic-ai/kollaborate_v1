import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-black text-white p-6 sm:p-8 font-sans text-sm sm:text-base">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3">
        Terms of Service for Kollaborate
      </h2>

      <p className="mb-1">Effective Date: August 5, 2024</p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        1. Acceptance of Terms
      </h3>

      <p className="mb-2">
        By accessing or using Kollaborate, you agree to be bound by these Terms
        of Service. If you do not agree to these Terms, you may not use our
        services.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        2. Your Account
      </h3>

      <p className="mb-2">
        You must create an account to use certain features of Kollaborate. You
        are responsible for maintaining the confidentiality of your account
        information and for all activities that occur under your account. You
        agree to provide accurate and complete information when creating your
        account and to update it promptly if it changes.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        3. Your Content
      </h3>

      <p className="mb-2">
        You retain ownership of any content you submit to Kollaborate. However,
        by submitting content, you grant us a worldwide, non-exclusive,
        royalty-free license to use, copy, reproduce, process, adapt, modify,
        publish, transmit, display, and distribute your content in connection
        with our services. You represent and warrant that you have all necessary
        rights to grant us this license.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        4. Prohibited Conduct
      </h3>

      <p className="mb-2">
        You agree not to use Kollaborate to:
      </p>
      <ul className="list-disc list-inside mb-4 pl-5">
        <li>Violate any applicable laws or regulations.</li>
        <li>Infringe on the intellectual property rights of others.</li>
        <li>
          Post or transmit any harmful, offensive, or inappropriate content,
          including but not limited to content that is hateful, threatening,
          pornographic, or incites violence.
        </li>
        <li>
          Interfere with or disrupt the integrity or performance of Kollaborate,
          including but not limited to introducing viruses, worms, or other
          malicious code.
        </li>
        <li>Impersonate any person or entity or falsely state or otherwise
        misrepresent your affiliation with a person or entity.
        </li>
        <li>Collect or store personal data about other users without their consent.</li>
      </ul>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        5. Intellectual Property
      </h3>

      <p className="mb-2">
        Kollaborate, its logo, and all other trademarks, service marks, graphics,
        and logos used in connection with Kollaborate are trademarks or
        registered trademarks of Kollaborate or its licensors. You may not use
        our intellectual property without our prior written consent.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        6. Third-Party Services
      </h3>

      <p className="mb-2">
        Kollaborate may contain links to third-party websites or services that
        are not owned or controlled by us. We have no control over, and assume
        no responsibility for, the content, privacy policies, or practices of any
        third-party websites or services.
      </p>
      {/* ... (7 to 12) ... */}

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
        13. Contact Us
      </h3>

      <p className="mb-2">
        If you have any questions about these Terms of Service, please contact us
        at:
      </p>

      <p className="font-semibold">admin@kollaborate.co</p>
    </div>
  );
};

export default TermsOfService;

