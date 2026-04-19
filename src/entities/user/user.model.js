export function createUser(data = {}) {
  return {
    id: '',
    name: '',
    role: 'customer',
    ...data,
  }
}
