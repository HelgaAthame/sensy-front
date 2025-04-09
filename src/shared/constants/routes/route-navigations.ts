export const appRoutes = {
  auth: {
    signIn: '/auth/sign-in',
  },
  private: {
    dashboard: '/',
    call: (Id: string) => `/calls/${Id}`,
    calls: '/calls',
    uploadingRecord: '/uploading-record',
    operators: '/operators',
    projects: '/projects',
  },
}
