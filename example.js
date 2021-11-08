const DateDisplay = ({ date }) => {
  const dateTemp = date ? new Date(date).toLocaleString() : 'No Run';
  return <div>{dateTemp}</div>;
};

const data = getSurvey();

const request = () =>
  new Promise(resolve => setTimeout(() => resolve(data), 1000));

const SurveyList = props => {
  const {
    pageView,
    handlePageViewChange,
    isSurveyList,
    setIsSurveyList
  } = props;

  const [listData, setListData] = useState({});

  let history = useHistory();

  const getRowLink = rowData => {
    return './survey/' + rowData.survey_id;
  };

  const handleSearch = value => {
    return columnObject.filter(value => columnObject.includes(value));
  };

  useEffect(() => {
    document.title = 'Starling - Survey';
    if (pageView !== 'surveyList') handlePageViewChange('surveyList');
    getSurvey();
    return () => {
      document.title = 'Starling';
    };
  }, []);

  // useEffect(() => {
  //   request().then(data => setListData({ data }));
  // });

  console.log(listData);

  let [columnObject] = useState([
    {
      title: 'Survey Name',
      field: 'survey_survey_name',
      sorting: true,
      customSort: (a, b) =>
        a.survey_survey_name.trim().localeCompare(b.survey_survey_name.trim()),
      render: rowData => (
        <div>
          <a
            style={{
              color: '#0070c9'
            }}
            onClick={() => {
              history.push(getRowLink(rowData));
            }}
          >
            {rowData.survey_survey_name}
          </a>
        </div>
      )
    },
    {
      title: 'ID',
      field: 'survey_id',
      sorting: true,
      render: rowData => (
        <span>{rowData.survey_id ? rowData.survey_id : 'N/A'}</span>
      )
    },
    {
      title: 'Survey ID',
      field: 'survey_survey_id',
      sorting: true,
      render: rowData => (
        <span>
          {rowData.survey_survey_id ? rowData.survey_survey_id : 'N/A'}
        </span>
      )
    },
    {
      title: 'Lorem',
      field: 'survey_lorem',
      sorting: true,
      render: rowData => (
        <span>{rowData.survey_lorem ? rowData.survey_lorem : 'N/A'}</span>
      )
    },
    {
      title: 'Creator',
      field: 'survey_creator',
      sorting: true,
      render: rowData => (
        <span>{rowData.survey_creator ? rowData.survey_creator : 'N/A'}</span>
      )
    },
    {
      title: 'Data Created',
      field: 'survey_date_created',
      sorting: true,
      render: rowData => <DateDisplay date={rowData['survey_date_created']} />
    }
  ]);

  let [fakeData] = useState([
    {
      survey_survey_name: 'Example',
      survey_id: '213',
      survey_survey_id: 'example213',
      survey_lorem: 'SOS',
      survey_creator: 'Helen',
      survey_date_created: '10/31/2021'
    },
    {
      survey_survey_name: 'Hello',
      survey_id: '123',
      survey_survey_id: 'hello123',
      survey_lorem: 'IDK',
      survey_creator: 'Hanwen',
      survey_date_created: '11/1/2021'
    },
    {
      survey_survey_name: 'Hi',
      survey_id: '321',
      survey_survey_id: 'hi321',
      survey_lorem: 'OMW',
      survey_creator: 'Zhang',
      survey_date_created: '11/2/2021'
    }
  ]);

  return (
    <MaterialTable
      title=""
      // tableRef={tableRef}
      style={{
        width: '100%',
        flex: '0 0 auto',
        boxShadow: 'none'
      }}
      // localization={{
      //   body: {
      //     emptyDataSourceMessage:
      //       loading || loadingJobs ? '' : 'No records to display'
      //   }
      // }}
      options={{
        // pageSize: tablePageSize,
        //maxBodyHeight: tableMaxHeight,
        exportButton: true,
        selection: false,
        // searchFieldVariant: searchFieldVariantValue,
        // searchFieldStyle: searchFieldStyles,
        // searchText: searchString,

        rowStyle: (rowData, index) => ({
          backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F2F2F2',
          lineHeight: '14px',
          height: '57px',
          fontSize: '12px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          fontWeight: 'normal',
          color: '#000'
        }),
        cellStyle: {
          fontSize: '12px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          fontWeight: 'normal',
          border: 'none'
        },
        headerStyle: {
          backgroundColor: '#D8D8D8',
          color: '#000',
          fontSize: '12px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          fontWeight: '600',
          height: '57px'
        }
      }}
      data={fakeData}
      columns={columnObject}
      onSearchChange={handleSearch}
    />
  );
};

function mapStateToProps(state) {
  return {
    initialState: state.initialState,
    currentUser: state.currentUser
  };
}
export default connect(mapStateToProps, store => ({
  getSurvey: getSurvey(store),
  saveSurvey: saveSurvey(store)
}))(React.memo(SurveyList));
