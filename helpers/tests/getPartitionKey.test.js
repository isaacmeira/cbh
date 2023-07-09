const { getPartitionKey } = require('../getPartitionKey');

describe('getPartitionKey', () => {
  it('should return null when event is null or undefined', () => {
    const nullResult = getPartitionKey(null);
    const undefinedResult = getPartitionKey(undefined);

    expect(nullResult).toBeNull();
    expect(undefinedResult).toBeNull();
  });

  it('should return event.partitionKey when it is present', () => {
    const partitionKey = 'test partition key';
    const event = { partitionKey };

    const result = getPartitionKey(event);

    expect(result).toEqual(partitionKey);
  });

  it('should return a string when partitionKey is not present', () => {
    const event = { test: 'event' };

    const result = getPartitionKey(event);

    // We can't predict the exact hash, but we can check it's a string
    expect(typeof result).toEqual('string');
  });
});
