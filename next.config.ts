import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);
