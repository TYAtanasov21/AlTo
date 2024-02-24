import { useNavigate } from 'react-router-dom';
import React from 'react';

function TermsOfUse() {
  const navigate = useNavigate();
  return (

    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md text-neutral-800 mb-8">
        <h2 className="text-3xl font-semibold mb-4">Terms of Use</h2>
      <p className="mb-4">
        Welcome to AlTo Music. By using this website, you agree to comply with and be bound by the following terms and conditions of use.
      </p>
      <p className="mb-4">
        The songs provided on this website are for educational and entertainment purposes only. The legal rights of these songs are owned by their respective artists and record labels.
      </p>
      <p className="mb-4">
        We do not provide any warranty or guarantee regarding the accuracy, completeness, suitability, or availability of the song information. Your use of this website and its song content is at your own risk.
      </p>
      <p className="mb-4">
        You may not use the songs for commercial purposes or in any way that violates the legal rights of the artists or record labels. Unauthorized use may result in legal consequences.
      </p>
      <p className="mb-4">
        We may include links to official sources for the songs. These links are provided for your convenience, and we do not endorse or take responsibility for the content of external websites.
      </p>
      <p className="mb-4">
        Your use of this website is subject to the laws of Bulgaria. We respect the legal rights of artists and copyright holders, and we expect our users to do the same.
      </p>
      <p className="mb-4">
        We, and any third parties, do not provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the song information found on this website.
      </p>
      <p className="mb-4">
        Your use of song information on this website is entirely at your own risk. It is your responsibility to ensure compliance with legal rights and requirements.
      </p>
    </div>
    <form>
        <button
          onClick={() => {
            navigate('/');
          }}
          type="button"
          className="btn btn-link hover:text-zinc-500 hover:bg-zinc-400  text-white transition-colors ml-3 bg-zinc-300 rounded-md p-2"
        >
          Back
        </button>
      </form>
    </div>

  );
}

export default TermsOfUse;
