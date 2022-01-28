export const localStorageService = ({key, encoder = JSON.stringify, decoder = JSON.parse}: {key: string, encoder?: typeof JSON.stringify, decoder?: typeof JSON.parse}) => {
  const LOCAL_KEY = `acid-labs--${key}`;
  
  return {
    load: () => JSON.parse(localStorage.getItem(LOCAL_KEY) || ''),
    save: (value: ReturnType<typeof encoder>) => localStorage.setItem(LOCAL_KEY, encoder(value))
  }
}