import * as React from 'react';
import { connect } from 'react-redux';

import {
  ActionTypes,
  ConnectionFormChangedAction,
  OpenConnectionStringInputAction
} from '../../store/actions';
import FormGroup from '../form/form-group';
import HostInput from './host/host-input';
import PortInput from './host/port-input';
import SRVInput from './host/srv-input';
import Authentication from './authentication/authentication';
import ReplicaSetInput from './replica-set-input';
import ReadPreferenceSelect from './read-preference-select';
import SSLMethod from './ssl/ssl-method';
import SSHTunnel from './ssh/ssh-tunnel';
import FormActions from '../form/form-actions';
import ConnectionModel from '../../connection-model/connection-model';
import { AppState } from '../../store/store';

const styles = require('./connection-form.less');

type StateProps = {
  connectionMessage: string;
  currentConnection: ConnectionModel;
  errorMessage: string;
  isConnected: boolean;
  isConnecting: boolean;
  isValid: boolean;
  syntaxErrorMessage: string;
};

type DispatchProps = {
  onConnectionFormChanged: () => void;
  onOpenConnectionStringInput: () => void;
};

type props = StateProps & DispatchProps;

export class ConnectionForm extends React.Component<props> {
  static displayName = 'ConnectionForm';

  onConnectWithConnectionStringClicked = (): void => {
    this.props.onOpenConnectionStringInput();
  };

  /**
   * Renders a port input.
   *
   * @returns {React.Component}
   */
  renderPort(): React.ReactNode {
    const { currentConnection } = this.props;

    const { isSrvRecord, port } = currentConnection;

    if (!isSrvRecord) {
      return <PortInput port={port} />;
    }
  }

  renderHostnameArea(): React.ReactNode {
    const { currentConnection, isValid } = this.props;

    const {
      authStrategy,
      hostname,
      isSrvRecord,
      kerberosCanonicalizeHostname,
      kerberosPassword,
      kerberosPrincipal,
      kerberosServiceName,
      ldapPassword,
      ldapUsername,
      mongodbDatabaseName,
      mongodbPassword,
      mongodbUsername,
      x509Username
    } = currentConnection;

    return (
      <div>
        <FormGroup id="connection-host-information" separator>
          <HostInput hostname={hostname} />
          {this.renderPort()}
          <SRVInput isSrvRecord={isSrvRecord} />
        </FormGroup>
        <Authentication
          authStrategy={authStrategy}
          isValid={isValid}
          kerberosCanonicalizeHostname={kerberosCanonicalizeHostname}
          kerberosPassword={kerberosPassword}
          kerberosPrincipal={kerberosPrincipal}
          kerberosServiceName={kerberosServiceName}
          ldapPassword={ldapPassword}
          ldapUsername={ldapUsername}
          mongodbDatabaseName={mongodbDatabaseName}
          mongodbPassword={mongodbPassword}
          mongodbUsername={mongodbUsername}
          x509Username={x509Username}
        />
      </div>
    );
  }

  renderConnectionOptionsArea(): React.ReactNode {
    const { currentConnection } = this.props;

    const {
      readPreference,
      replicaSet,
      sshTunnel,
      sslMethod
    } = currentConnection;

    return (
      <div>
        <FormGroup id="read-preference" separator>
          <ReplicaSetInput sshTunnel={sshTunnel} replicaSet={replicaSet} />
          <ReadPreferenceSelect readPreference={readPreference} />
        </FormGroup>
        <SSLMethod sslMethod={sslMethod} />
        <SSHTunnel sshTunnel={sshTunnel} />
      </div>
    );
  }

  /**
   * Renders a component with messages.
   *
   * @returns {React.Component}
   */
  renderConnectionMessage(): React.ReactNode {
    const { isConnected, connectionMessage } = this.props;

    if (isConnected && connectionMessage) {
      return (
        <div className={styles['connection-message-container']}>
          <div className={styles['connection-message-container-success']}>
            <div
              className={styles['connection-message']}
            >{connectionMessage}</div>
          </div>
        </div>
      );
    }
  }

  render(): React.ReactNode {
    const {
      connectionMessage,
      currentConnection,
      errorMessage,
      isConnected,
      isConnecting,
      isValid,
      onConnectionFormChanged,
      syntaxErrorMessage
    } = this.props;

    return (
      <form
        onChange={onConnectionFormChanged}
        className={styles['connection-form']}
      >
        <h1>Connect to MongoDB</h1>
        <div>
          Enter your connection details below, or{' '}
          <a href="#" onClick={this.onConnectWithConnectionStringClicked}>
            connect with a connection string
          </a>
        </div>
        {this.renderConnectionMessage()}
        <div className={styles['connection-form-fields']}>
          {this.renderHostnameArea()}
          {this.renderConnectionOptionsArea()}
        </div>
        <FormActions
          connectionMessage={connectionMessage}
          currentConnection={currentConnection}
          errorMessage={errorMessage}
          isConnected={isConnected}
          isConnecting={isConnecting}
          isValid={isValid}
          syntaxErrorMessage={syntaxErrorMessage}
        />
      </form>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    connectionMessage: state.connectionMessage,
    currentConnection: state.currentConnection,
    errorMessage: state.errorMessage,
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    isValid: state.isValid,
    syntaxErrorMessage: state.syntaxErrorMessage
  };
};

const mapDispatchToProps: DispatchProps = {
  // Resets URL validation if form was changed.
  onConnectionFormChanged: (): ConnectionFormChangedAction => ({
    type: ActionTypes.CONNECTION_FORM_CHANGED
  }),
  onOpenConnectionStringInput: (): OpenConnectionStringInputAction => ({
    type: ActionTypes.OPEN_CONNECTION_STRING_INPUT
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionForm);
