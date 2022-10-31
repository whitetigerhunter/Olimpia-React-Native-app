import { Metrics } from 'app/Theme';

export default {
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  headerLeft: {
    flex: 0.3,
  },
  headerBody: {
    flex: 0.4,
  },
  textBody: {
    alignSelf: 'center',
  },
  headerRight: {
    flex: 0.3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  modalBasic: {
    flex: 1,
  },
  modalTop: {
    height: 230,
  },
  modalCenter: {
    height: 300,
    width: 300,
    paddingVertical: 10,
  },
  modalBottom: {
    height: 100,
  },
  text: {
    color: 'black',
    fontSize: 22,
    alignSelf: 'center',
  },
  btnClose: {
    position: 'absolute',
    top: Metrics.margin,
    right: Metrics.margin,
  },
  btnShowModal: {
    marginTop: 10,
  },
  txtMessage: {
    color: '#000',
  },
};
