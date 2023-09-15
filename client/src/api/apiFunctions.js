import axios from 'axios';
import { api } from './axiosMy';

export const deleteUserApi = async (server, id) => {
  try {
    const response = await api.delete(`/v01/admins/deleteuser/${id}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
};

export const fetchAdmins = async (server) => {
  try {
    const response = await api.get(`/v01/admins/getAdmins/all`, {
      withCredentials: true,
    });
    return response.data.admins;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
};

export const fetchColleges = async (server) => {
  try {
    const response = await api.get(`/v01/admins/getColleges/all`, {
      withCredentials: true,
    });
    return response.data.colleges;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
}

export const addCollege = async (server, values) => {
  try {
    const response = await api.post(`/v01/admins/addCollege`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
};


export const deleteCollegeApi = async (server, id) => {
  try {
    const response = await api.delete(`/v01/admins/deletecollege/${id}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
};

export const fetchNotes = async (server, id) => {
  try {
    const response = await api.get(`/v01/notes/getNotes/all/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }

}

export const fetchPapers = async (server, id) => {
  try {
    const response = await api.get(`/v01/prevpapers/getPapers/all/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }

}

export const fetchLinks = async (server, id) => {
  try {
    const response = await api.get(`/v01/links/getLinks/all/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
}

export const fetchSeniorTalks = async (server, id) => {
  try {
    const response = await api.get(`/v01/seniortalks/getSeniorTalks/all/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
}

export const fetchInsights = async (server, id) => {
  try {
    const response = await api.get(`/v01/seminsights/getSemInsights/all/${id}`, {
      withCredentials: true,
    });
    return response.data;

  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error('Network Error. The backend server is offline. Contact the admins or try again later.');
    } else {
      throw new Error('Unknown Error. Contact the admins or try again later.');
    }
  }
}