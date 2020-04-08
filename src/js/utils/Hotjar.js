export const hotjarSafetyStub = () => window.hj=window.hj || function(){(hj.q=hj.q||[]).push(arguments)}; // eslint-disable-line

export const hotjarTrigger = (name) => hj('trigger', name);
