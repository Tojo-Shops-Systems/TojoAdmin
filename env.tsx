const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

export const Env = {
  createBranch: `${BASE_URL}/api/cloud/create-branch`,
  getBranches: `${BASE_URL}/api/cloud/getBranches`,
  registerPersonalDataBoss: `${BASE_URL}/api/cloud/personalData`,
};