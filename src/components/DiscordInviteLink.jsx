import React from "react";

const DiscordInviteLink = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-orange-800/65 via-orange-500/65 to-white/65 text-white mb-6 bg-gradient-to-r p-4 rounded-lg shadow-lg">
        Discord Invite Link:{" "}
        <a
          href="https://discord.gg/hYzzgNpX"
          className="text-2xl font-medium text-orange-300 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>Click Here</b>
        </a>
      </h2>
    </section>
  );
};

export default DiscordInviteLink;
