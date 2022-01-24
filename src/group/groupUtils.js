import _ from 'lodash/fp';

export const extractMembers = group =>
  _.getOr([], 'memberships.edges', group).map(edge => ({
    membershipId: _.get('node.id', edge),
    ..._.get('node.user', edge),
  }));

export const extractAccountMembership = group =>
  _.get('accountMembership.edges[0].node', group);

export const getMemberships = groups =>
  _.flow(
    _.map(group => [group.slug, { group, fetching: false }]),
    _.fromPairs
  )(groups);
