import axios from 'axios';

const MOCK = true; // prod'da false yap, baseURL'i doldur
export const http = axios.create({ baseURL: 'https://api.satistakip.local' });

let _appointments = [
  { id:'a1', title:'Mimar Ahmet - Taha Çelik', plannedStart:new Date().toISOString(), status:'PLANNED' },
  { id:'a2', title:'Dükkan Ziyareti - Stand Kontrol', plannedStart:new Date().toISOString(), status:'PLANNED' }
];
let _customers = [
  { id:'c1', name:'Taha Çelik', segment:'ACTIVE' },
  { id:'c2', name:'Mimar Ahmet', segment:'POTENTIAL' },
];

export const api = {
  async login(email, password, roleHint) {
    if (MOCK) {
      const role = roleHint || 'SALES'; // 'ADMIN' / 'MANAGER'
      return { user:{ id:'u1', fullName:'Demo Kullanıcı', role } };
    }
    const { data } = await http.post('/auth/login', { email, password });
    http.defaults.headers.common.Authorization = `Bearer ${data.access}`;
    return data;
  },

  async getAppointmentsToday() {
    if (MOCK) return _appointments;
    const { data } = await http.get('/appointments?date=today&mine=true');
    return data;
    },

  async getAppointment(id) {
    if (MOCK) return _appointments.find(x=>x.id===id);
    const { data } = await http.get(`/appointments/${id}`); return data;
  },

  async startAppointment(id, coords, voiceNoteUrl) {
    if (MOCK) {
      _appointments = _appointments.map(a => a.id===id ? ({ ...a, status:'STARTED', actualStart:new Date().toISOString(), geoStart:coords }) : a);
      return _appointments.find(a=>a.id===id);
    }
    const { data } = await http.post(`/appointments/${id}/start`, { ...coords, voiceNoteUrl });
    return data;
  },

  async finishAppointment(id, coords, notes, photos=[]) {
    if (MOCK) {
      _appointments = _appointments.map(a => a.id===id ? ({ ...a, status:'FINISHED', actualEnd:new Date().toISOString(), geoEnd:coords, notes, photos }) : a);
      return _appointments.find(a=>a.id===id);
    }
    const { data } = await http.post(`/appointments/${id}/finish`, { ...coords, notes, standPhotos:photos });
    return data;
  },

  async getCustomers(search='') {
    if (MOCK) return _customers.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
    const { data } = await http.get('/customers', { params:{ search } }); return data;
  },

  async createRequest(payload) {
    if (MOCK) return { id: String(Math.random()), status:'PENDING', ...payload };
    const { data } = await http.post('/requests', payload); return data;
  },

  async createSale(payload) {
    if (MOCK) return { id:String(Math.random()), ...payload, commission: payload.amount * 0.02 };
    const { data } = await http.post('/sales', payload); return data;
  },

  async createCollection(payload) {
    if (MOCK) return { id:String(Math.random()), ...payload };
    const { data } = await http.post('/collections', payload); return data;
  },
};
