import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        name: "dashboardHost",

        remotes: {
          dashboardCards: "dashboardCards@http://localhost:3001/remoteEntry.js",
        },

        shared: {
          react: {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
          },
        },
      }),
    );

    return config;
  },
};

export default nextConfig;
