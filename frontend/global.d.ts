export {};

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace accounts {
      namespace id {
        interface CredentialResponse {
          clientId: string;
          credential: string;
          select_by: string;
        }

        function initialize(options: {
          client_id: string;
          callback: (response: CredentialResponse) => void;
        }): void;

        function prompt(): void;

        export function renderButton(arg0: HTMLElement, arg1: { theme: string; size: string; width: number; }) {
          throw new Error("Function not implemented.");
        }
      }
    }
  }
}
