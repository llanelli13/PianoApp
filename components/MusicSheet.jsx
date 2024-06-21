import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Line, Text as SvgText } from 'react-native-svg';
import { Midi } from '@tonejs/midi';

const MusicSheet = ({ midiFileUrl }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(midiFileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const midi = new Midi(arrayBuffer);
        const trackNotes = midi.tracks.flatMap(track => track.notes);
        setNotes(trackNotes);
      })
      .catch((error) => {
        console.error('Error fetching or parsing MIDI file:', error);
      });
  }, [midiFileUrl]);

  const renderNotes = () => {
    return notes.map((note, index) => (
      <SvgText
        key={index}
        x={(index + 1) * 20}
        y={100 - (note.midi - 60) * 10}
        fontSize="16"
        fill="black"
      >
        ●
      </SvgText>
    ));
  };

  return (
    <View>
      <Text>Music Sheet:</Text>
      <Svg height="200" width="500">
        <Line x1="0" y1="100" x2="500" y2="100" stroke="black" />
        <Line x1="0" y1="80" x2="500" y2="80" stroke="black" />
        <Line x1="0" y1="60" x2="500" y2="60" stroke="black" />
        <Line x1="0" y1="40" x2="500" y2="40" stroke="black" />
        <Line x1="0" y1="20" x2="500" y2="20" stroke="black" />
        {renderNotes()}
      </Svg>
    </View>
  );
};

export default MusicSheet;
