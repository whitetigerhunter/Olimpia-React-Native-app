import apisauce from 'apisauce';
import { AxiosResponse } from 'axios';

import * as types from '../Constants/types';

const create = (baseURL = 'http://api.ohmynote.com/') => {
    const static_token = 'Api-Key JcUfL0noKGp0vZZ7Cjj5e5p8rZhjDF';
    const use_static_token = true;
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            // 'Content-Type': 'application/json',
        },
        timeout: 5 * 60 * 1000,
    });

    const authenticate = ({email, password}: any) => {
        console.log('API LISTEN', '/rest-auth/login/')
        return api.post('/rest-auth/login/', {email, password});
    }

    const authenticateWithFB = (token: string) => {
        console.log('API LISTEN', `/authenticate-by-token/facebook?access_token=${token}`)
        return api.get(`/authenticate-by-token/facebook?access_token=${token}`);
    }


    const authenticateWithGoogle = (token: string) => {
        console.log('API', api);
        console.log('baseURL', baseURL);
        console.log('API LISTEN', `/authenticate-by-token/google-oauth2?access_token=${token}`)
        return api.get(`/authenticate-by-token/google-oauth2?access_token=${token}`);
    }


    const authenticateWithApple = (token: string) => {
        console.log('API LISTEN', `/authenticate-by-token/apple?access_token=${token}`)
        return api.get(`/authenticate-by-token/apple?access_token=${token}`);
    }


    const getUser = (token: string) => {
        console.log('API LISTEN', '/clients/client/')
        return api.get(
            '/clients/client/',
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        );
    };

    const getUserByIdAndToken = (id: string, token: string) => {
        console.log('API LISTEN', `/clients/client/${id}`)
        return api.get(
            `/clients/client/${id}`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        );
    }

    //   https://react.ohmynote.com/clients/feed-search/?q=hamza
    const searchUsers = async (token: any, q: any) => {
        console.log('API LISTEN', `/clients/feed-search/?q=${q}`)
        console.log(q, token);
        const res = await api.get(
            `/clients/feed-search/?q=${q}`, // /clients/client/
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        );
        console.log(res);
        return res;
    };

    const updateUser = (token: any, id: string, user: object) => {
        console.log('API LISTEN', `/clients/client/${id}/`)
        api.patch(
            `/clients/client/${id}/`, // /authentication/profile/${id}
            user,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        );

    }

    const register = ({email, firstName, lastName, password, language}: types.RegistrationPayload) => {
        console.log('API LISTEN', '/rest-auth/registration/')
        return api.post('/rest-auth/registration/', {
            email,
            first_name: firstName,
            last_name: lastName,
            password,
            language,
        });
    }


    const signOff = ({token}: any) => {
        console.log('API LISTEN', '/rest-auth/logout/')
        return api
            .post(
                '/rest-auth/logout/',
                {},
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        Referer: 'https://react.ohmynote.com/',
                    },
                },
            )
            .then((res) => {
                return res.data;
            })
            .catch((e) => console.log('auth', e));
    };

    const requestResetPassword = ({email}: any) => {
        console.log('API LISTEN', '/rest-auth/password/reset/')
        return api.post('/rest-auth/password/reset/', {email});
    }

    const confirmResetPassword = ({password, passwordConfirm, uid, token}: any) => {
        console.log('API LISTEN', '/rest-auth/password/reset/confirm/')
        return api
            .post('/rest-auth/password/reset/confirm/', {
                new_password1: password,
                new_password2: passwordConfirm,
                uid,
                token,
            })
            .then((res) => res.data)
            .catch((e) => console.log('auth', e));
    };

    const uploadStory = (story: any, token: string) => {
        console.log('API LISTEN', api.getBaseURL(), api.headers, '/api/uploading/story/')
        console.log('send upload story request', story, (use_static_token ? static_token : token));
        return api.post('/api/uploading/story/', story, {
            headers: {
                Authorization: `${use_static_token ? static_token : 'Token ' + token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    }

  const uploadUserPhoto = (photo: any, token: any) => {
      console.log('API LISTEN', '/clients/photo/')
    return api.post('/clients/photo/', photo, {
          headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data',
          },
      });
  }


  const feedBack = (feed: any, token: any) => {
      console.log('API LISTEN', '/clients/app-rate/')
      return api
          .post('/clients/app-rate/', feed, {
              headers: {
                  Authorization: `Token ${token}`,
                  //   'Content-Type': 'multipart/form-data'
              },
          })
          .then((res) => {
              return res;
          });

  }



  const notesSelection = ({
    selected_notes,
    added_notes,
    id,
    token,
    latitude,
    longitude,
    mode,
    saved_recipe,
    recipe_name,
  }: {
    selected_notes: number[];
    added_notes: number[];
    id: number;
    token: string;
    latitude: number;
    longitude: number;
    mode: string[];
    saved_recipe: boolean;
    recipe_name: string;
  }) => {
      console.log('API LISTEN', `/api/uploading/suggestion/${id}/`)
      return api.patch(
          `/api/uploading/suggestion/${id}/`,
          {
              selected_notes,
              added_notes,
              latitude,
              longitude,
              mode,
              saved_recipe,
              recipe_name,
          },
          {
              headers: {
                  Authorization: `${use_static_token ? static_token : 'Token ' + token}`,
              },
          },
      );
  }


  const getPerfumesByType = async (
    notes: types.Note[],
    id: number,
    token: string,
    latitude: number,
    longitude: number,
    mode: string[],
  ) => {
    const selectedNoteIds = notes.map((n) => n.pk);
    const formData = {
        notes: selectedNoteIds,
        latitude,
        longitude,
        mode,
    };
    console.log('API LISTEN', `/api/uploading/suggestion/${id}/`, JSON.stringify(formData))
    return await api.patch(
      `/api/uploading/suggestion/${id}/`,
      {
        notes: selectedNoteIds,
        latitude,
        longitude,
        mode,
      },
      {
        headers: {
          Authorization: `${use_static_token ? static_token : 'Token ' + token}`,
        },
      },
    );
  };

  const updateCollection = (mode: any, id: number, token: any) => {
      console.log('API LISTEN', '/clients/update-collection/')
      return api.post(
          '/clients/update-collection/',
          {
              mode,
              parfum_id: id,
          },
          {
              headers: {
                  Authorization: `Token ${token}`,
              },
          },
      );
  }


  const setFollow = (mode: any, id: string, token: any) => {
      console.log('API LISTEN', '/clients/update-followings/')
      return api.post(
          '/clients/update-followings/',
          {
              mode,
              client_id: id,
          },
          {
              headers: {
                  Authorization: `Token ${token}`,
              },
          },
      );
  }

  const setUserCollection = (mode: any, id: string, token: any) => {
      console.log('API LISTEN', '/clients/update-myparfums/')
      return api.post(
          '/clients/update-myparfums/',
          {
              mode,
              parfum_id: id,
          },
          {
              headers: {
                  Authorization: `Token ${token}`,
              },
          },
      );
  }


  const searchNote = (text: string, token: string) => {
    console.log('API LISTEN', `/api/ada/note/?search=${text}`)
    return api
      .get(
        `/api/ada/note/?search=${text}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => res.data);
  };

  const searchPerfume = (text: string, token: any) => {
      console.log('API LISTEN', `/api/ada/?search=${text}`)
      return api
          .get(
              `/api/ada/?search=${text}`,
              {},
              {
                  headers: {
                      Authorization: `Token ${token}`,
                  },
              },
          )
          .then((res) => {
              return res.data;
          })
          .catch((e) => console.log('search notes', e));
  }


  const collection = ({ token }: any) => {
      console.log('API LISTEN get collection URL', ``)
      return api.get(
          '', // get collection URL
          {},
          {
              headers: {
                  Authorization: `Token ${token}`,
              },
          },
      );
  }



  const getAllNotes = (token: string) => {
    console.log('API LISTEN', `/api/ada/note/?limit=1000`)
    return api
      .get(
        `/api/ada/note/?limit=1000`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => res.data);
  };

  const getRecipes = ({ token }: any) => {
      console.log('API LISTEN', `/clients/recipe/`, token)
      return api.get(
          '/clients/recipe/',
          {},
          {
              headers: {
                  Authorization: `Token ${token}`,
              },
          },
      );
  }

  const getPerfume = async (perfumeId: number, token: string): Promise<types.Perfume> => {
    console.log('API LISTEN', `/api/perfumer/perfumer/${perfumeId}`, perfumeId, token);
    const response: AxiosResponse<types.Perfume> = (await api.get(
      `/api/perfumer/perfumer/${perfumeId}`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )) as any;
    console.log(response);
    return response.data as types.Perfume;
  };

  return {
    authenticate,
    authenticateWithGoogle,
    authenticateWithApple,
    getPerfumesByType,
    searchPerfume,
    setUserCollection,
    setFollow,
    getUserByIdAndToken,
    searchUsers,
    updateCollection,
    uploadUserPhoto,
    feedBack,
    searchNote,
    updateUser,
    getUser,
    register,
    signOff,
    requestResetPassword,
    confirmResetPassword,
    uploadStory,
    notesSelection,
    authenticateWithFB,
    collection,
    getAllNotes,
    getRecipes,
    getPerfume,
  };
};
export default {
  create,
};
