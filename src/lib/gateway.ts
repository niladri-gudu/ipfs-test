export function gatewayUrl(cid: string) {
  const domain = process.env.NEXT_PUBLIC_GATEWAY_URL;

  if (!domain) throw new Error("NEXT_PUBLIC_GATEWAY_URL is missing");

  return `https://${domain}/ipfs/${cid}`;
}
