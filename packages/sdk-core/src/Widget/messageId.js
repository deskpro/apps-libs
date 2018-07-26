const ids = {
  messageId: 0,
  correlationId: 0
};

export const nextMessageId = () => {
  return ++ids.messageId;
};

export const nextCorrelationId = () => {
  return ++ids.correlationId;
};
