import serverAutomated from "../serverAutomated";

class AutomatedRequester {
  subscribeNewsletter = async (email_address: string, status: string, FNAME: string, LNAME: string) => {
    return serverAutomated({
      url: `webhook/9c9625bb-8c32-41e6-8023-c04be6a3e964`,
      method: 'POST',
      data: {
        email_address,
        status,
        merge_fields: {
          FNAME,
          LNAME
        }
      }
    });
  }
}

const automatedRequester = new AutomatedRequester();

export default automatedRequester;
