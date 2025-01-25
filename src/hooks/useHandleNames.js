const useHandleNames = name => {
  return name => name.replace(/_/g, ' ');
};

export default useHandleNames;
