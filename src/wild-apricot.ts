import fetch from 'node-fetch';
import { WILD_APRICOT_API_KEY } from './config';

class WildApricot {
  public host = '';
  public isAuthenticated = false;
  public headers = { 'Authorization': '' };

  public async authenticate() {
    console.log(`Authenticating Wild Apricot`);

    const host = 'https://oauth.wildapricot.org';
    const url = `${host}/auth/token`;
    const auth = Buffer
      .from(`APIKEY:${WILD_APRICOT_API_KEY}`)
      .toString('base64');

    const result: AuthResponse = await fetch(url, {
      method: 'post',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&scope=auto'
    }).then((response) => response.json());

    const permissions = result.Permissions[0];

    this.isAuthenticated = true;
    this.headers['Authorization'] = `Bearer ${result.access_token}`;
    this.host = `https://api.wildapricot.org/v2.2/Accounts/${permissions.AccountId}`;

    const scopes = permissions.AvailableScopes.join('. ');
    console.log(`Received access token. Available scopes: ${scopes}`);
  }

  public async getEvents(): Promise<Array<Event>> {
    await this.authenticate();

    const url = `${this.host}/Events`;
    const result = await fetch(url, { headers: this.headers })
      .then((response) => response.json());

    return result['Events'];
  }
}

export const wildApricot = new WildApricot();

interface AuthResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  Permissions: [
    {
      AccountId: number;
      SecurityProfileId: number;
      AvailableScopes: Array<string>;
    }
  ]
}

interface Event {
  Id: number;                             // 4033303,
  Url: string;                            // 'https://api.wildapricot.org/v2.2/accounts/230049/Events/4033303'
  EventType: string;                      // 'Regular',
  StartDate: string;                      // '2020-10-31T10:00:00-07:00',
  EndDate: string;                        // '2020-10-31T10:00:00-07:00',
  Location: string;                       // 'Valley Ford, CA',
  RegistrationEnabled: boolean,
  RegistrationsLimit: number,
  PendingRegistrationsCount: number,
  ConfirmedRegistrationsCount: number,
  CheckedInAttendeesNumber: number,
  Tags: Array<string>,
  AccessLevel: string;                    // 'Public',
  StartTimeSpecified: boolean;
  EndTimeSpecified: boolean;
  HasEnabledRegistrationTypes: boolean;
  Name: string;
}
