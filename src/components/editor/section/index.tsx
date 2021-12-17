import React, { Component } from "react";

import { Bitburner } from "bitburner.types";
import PlayerSection from "./player-section";

interface Props {
  tab: Bitburner.SaveDataKey;
}

export default class EditorSection extends Component<Props> {
  get component() {
    switch (this.props.tab) {
      case Bitburner.SaveDataKey.PlayerSave:
        return <PlayerSection />;
      default:
        return <div>Not Implemented</div>;
    }
  }

  render() {
    return this.component;
  }
}
