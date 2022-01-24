import React, { useEffect } from 'react';
import _ from 'lodash/fp';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Link,
  Grid,
  Card,
  List,
  ListItem,
} from '@mui/material';

import { fetchLandscapes } from 'landscape/landscapeSlice';
import GroupMembershipButton from 'group/components/GroupMembershipButton';
import GroupMembershipCount from 'group/components/GroupMembershipCount';
import Table from 'common/components/Table';
import PageLoader from 'common/components/PageLoader';
import theme from 'theme';

const MembershipButton = ({ landscape }) => (
  <GroupMembershipButton
    groupSlug={_.get('defaultGroup.slug', landscape)}
    confirmMessageText="landscape.membership_leave_confirm_message"
    confirmMessageTitle="landscape.membership_leave_confirm_title"
    confirmButtonLabel="landscape.membership_leave_confirm_button"
    joinLabel="landscape.list_join_button"
    leaveLabel="landscape.list_leave_button"
    ownerName={landscape.name}
    sx={{ width: '100%' }}
  />
);

const LandscapeTable = ({ landscapes }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const columns = [
    {
      field: 'name',
      headerName: t('landscape.list_column_name'),
      flex: 1.5,
      minWidth: 200,
      renderCell: ({ row: landscape }) => (
        <Link component={RouterLink} to={`/landscapes/${landscape.slug}`}>
          {landscape.name}
        </Link>
      ),
    },
    {
      field: 'location',
      headerName: t('landscape.list_column_location'),
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: 'website',
      headerName: t('landscape.list_column_website'),
      sortable: false,
      flex: 1.5,
      minWidth: 200,
      renderCell: ({ row: landscape }) => (
        <Link href={landscape.website} underline="none">
          {landscape.website}
        </Link>
      ),
    },
    {
      field: 'members',
      headerName: t('landscape.list_column_members'),
      align: 'center',
      valueGetter: ({ row: landscape }) =>
        _.getOr(0, 'defaultGroup.members.length', landscape),
      renderCell: ({ row: landscape }) => (
        <GroupMembershipCount groupSlug={landscape.defaultGroup.slug} />
      ),
    },
    {
      field: 'actions',
      headerName: false,
      sortable: false,
      align: 'center',
      renderCell: ({ row: landscape }) => (
        <MembershipButton landscape={landscape} />
      ),
    },
  ];

  return (
    <Table
      rows={landscapes}
      columns={columns}
      initialSort={[
        {
          field: 'name',
          sort: 'asc',
        },
      ]}
      searchParams={Object.fromEntries(searchParams.entries())}
      onSearchParamsChange={setSearchParams}
      localeText={{
        noRowsLabel: t('landscape.list_empty'),
        footerPaginationRowsPerPage: t('common.data_grid_pagination_of'),
      }}
    />
  );
};

const LandscapeCards = ({ landscapes }) => {
  const { t } = useTranslation();

  return (
    <List>
      {landscapes.map(landscape => (
        <ListItem
          key={landscape.slug}
          sx={{ padding: 0, marginBottom: theme.spacing(2) }}
        >
          <Card sx={{ padding: theme.spacing(2), width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption">
                  {t('landscape.list_column_name')}
                </Typography>
                <Link
                  variant="body1"
                  display="block"
                  component={RouterLink}
                  to={`/landscapes/${landscape.slug}`}
                >
                  {landscape.name}
                </Link>
              </Grid>
              {landscape.location && (
                <Grid item xs={12}>
                  <Typography variant="caption">
                    {t('landscape.list_column_location')}
                  </Typography>
                  <Typography variant="body1">{landscape.location}</Typography>
                </Grid>
              )}
              {landscape.website && (
                <Grid item xs={12}>
                  <Typography variant="caption">
                    {t('landscape.list_column_website')}
                  </Typography>
                  <Link
                    component={Box}
                    href={landscape.website}
                    underline="none"
                  >
                    {landscape.website}
                  </Link>
                </Grid>
              )}
              <Grid item xs={6}>
                <Typography variant="caption">
                  {t('landscape.list_column_members')}
                </Typography>
                <GroupMembershipCount groupSlug={landscape.defaultGroup.slug} />
              </Grid>
              <Grid item xs={6}>
                <MembershipButton landscape={landscape} />
              </Grid>
            </Grid>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

const LandscapeList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { landscapes, fetching } = useSelector(state => state.landscape.list);
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(fetchLandscapes());
  }, [dispatch]);

  if (fetching) {
    return <PageLoader />;
  }

  return (
    <Box
      sx={{
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
      }}
    >
      <Typography variant="h1">{t('landscape.list_title')}</Typography>
      <Typography
        variant="body2"
        display="block"
        sx={{
          marginBottom: theme.spacing(3),
          marginTop: theme.spacing(2),
        }}
      ></Typography>
      {isSmall ? (
        <LandscapeCards landscapes={landscapes} />
      ) : (
        <LandscapeTable landscapes={landscapes} />
      )}
    </Box>
  );
};

export default LandscapeList;
