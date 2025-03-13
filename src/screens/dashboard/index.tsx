import { FlatList, Image, ImageBackground, ListRenderItem, ScrollView, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TWStyles } from 'twrn-styles'
import { styles } from './styles'
import { useRegion } from '@/hooks/region'
import { Dropdown } from 'react-native-element-dropdown'
import { useCity } from '@/hooks/city'
import { useWeather } from '@/hooks/weather'
import WebView from 'react-native-webview'
import { Card, Spacer } from 'twrn-components'
import { Daily } from '@/hooks/weather/types'
import moment from 'moment'
import 'moment/locale/id'
import { weatherCodes } from '@/hooks/weather/const'
import { images } from '@/assets/images'

const Dashboard = () => {
  const { provinces, onSelectProvince, selectedProvince } = useRegion()
  const { cities, onSelectCity, selectedCity } = useCity(selectedProvince?.value)
  const { dailyWeather, locationWeather } = useWeather(selectedCity?.label)

  const [isFocus, setIsFocus] = useState(false);
  const [isFocusCity, setIsFocusCity] = useState(false);
  const [mapHtml, setMapHtml] = useState('');

  useEffect(() => {
    if (!locationWeather) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
              #map { height: 50vh; width: 95vw; margin: 0; padding: 0; }
          </style>
      </head>
      <body>
          <div id="map"></div>
          <script>
              document.addEventListener("DOMContentLoaded", function() {
                  let lat = ${locationWeather?.lat || 0};
                  let lng = ${locationWeather?.lon || 0};
                  let name = ${locationWeather?.name || ''};

                  if (lat === 0 && lng === 0) {
                      document.getElementById('map').innerHTML = "<h3 style='text-align:center;'>Location data not available</h3>";
                  } else {
                      var map = L.map('map').setView([lat, lng], 13);
                      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                          attribution: '&copy; OpenStreetMap contributors'

                      }).addTo(map);
                      L.marker([lat, lng])
                      .addTo(map)
                      .bindPopup("<b>${locationWeather?.name || ''}</b>")
                      .openPopup();
                      map.on('click', function(e) {
                        window.ReactNativeWebView.postMessage(JSON.stringify(e.latlng));
                      });
                  }
              });
          </script>
      </body>
      </html>
    `;

    setMapHtml(html);
  }, [locationWeather]);

  const renderItem: ListRenderItem<Daily> = ({ item }) => {
    return (
      <Card containerStyle={TWStyles.rowGap12}>
        <Text style={[TWStyles.textAlignCenter, { fontSize: 18, fontWeight: 'bold' }]}>{moment(item.time).locale('id').format('dddd, DD MMMM yyyy')}</Text>
        <View style={[TWStyles.row, TWStyles.columnGap12]}>
          <View style={[TWStyles.displayFlex]}>
            <View style={[TWStyles.displayFlex, TWStyles.row]}>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>Sunrise</Text>
              </View>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>: {moment(item.values.sunriseTime).format('hh:mm A')}</Text>
              </View>
            </View>
            <View style={[TWStyles.displayFlex, TWStyles.row]}>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>Sunset</Text>
              </View>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>: {moment(item.values.sunsetTime).format('hh:mm A')}</Text>
              </View>
            </View>
            <View style={[TWStyles.displayFlex, TWStyles.row]}>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>Suhu Rata-rata</Text>
              </View>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>: {item.values.temperatureAvg}°C{'\n'}({item.values.temperatureMin} - {item.values.temperatureMax})°C</Text>
              </View>
            </View>
            <View style={[TWStyles.displayFlex, TWStyles.row]}>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>Cuaca</Text>
              </View>
              <View style={TWStyles.displayFlex}>
                <Text style={{ fontWeight: 'bold' }}>: {weatherCodes.weatherCode[item.values.weatherCodeMax]}</Text>
              </View>
            </View>
          </View>
          <Image source={weatherCodes.weatherIcon[item.values.weatherCodeMax]} style={{ width: 70, height: 70 }} />
        </View>
      </Card>
    )
  }

  return (
    <ImageBackground blurRadius={50} source={images.logo} imageStyle={{ resizeMode: 'cover' }} style={[TWStyles.displayFlex, TWStyles.rowGap12]}>
      <SafeAreaView style={[TWStyles.displayFlex, TWStyles.rowGap12]}>
        <View style={[TWStyles.horizontalDefaultPadding, TWStyles.verticalDefaultPadding]}>
          <StatusBar barStyle="dark-content" />
          <Text style={[styles.title, TWStyles.textAlignCenter]}>Cari Weather</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[TWStyles.flexGrow, TWStyles.rowGap12, TWStyles.verticalDefaultPadding]}>
            <View style={[TWStyles.rowGap8]}>
              <Text style={[styles.titlePicker]}>Pilih Provinsi</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={provinces}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Pilih Provinsi' : '...'}
                searchPlaceholder="Search..."
                value={selectedProvince?.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setIsFocus(false);
                  onSelectProvince(item)
                }}
              />
            </View>

            {selectedProvince && <View style={[TWStyles.rowGap8]}>
              <Text style={[styles.titlePicker]}>Pilih Kota</Text>
              <Dropdown
                style={[styles.dropdown, isFocusCity && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cities}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Pilih Kota' : '...'}
                searchPlaceholder="Search..."
                value={selectedCity?.value}
                onFocus={() => setIsFocusCity(true)}
                onBlur={() => setIsFocusCity(false)}
                onChange={item => {
                  setIsFocusCity(false);
                  onSelectCity(item)
                }}
              />
            </View>}
            {(locationWeather && mapHtml) && (
              <WebView
                source={{ html: mapHtml }}
                onMessage={(event) => console.log('Map Clicked:', event.nativeEvent.data)}
                onError={(err) => console.log('err', err)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
            )}
            {selectedCity && dailyWeather.length > 0 && (
              <View style={[TWStyles.rowGap4]}>
                <Text style={[styles.titlePicker]}>Weather</Text>
                <FlatList
                  data={dailyWeather}
                  keyExtractor={item => item.time}
                  renderItem={renderItem}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <Spacer height={20} />}
                  contentContainerStyle={{ paddingVertical: 10, }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      <View style={{ marginBottom: 30, alignItems: 'center' }}>
        <Text>Powered by:</Text>
        <Text style={{ fontWeight: 'bold', color: 'blue' }}>tomorrow.io, wilayah.id</Text>
      </View>
    </ImageBackground>
  )
}

export default Dashboard

