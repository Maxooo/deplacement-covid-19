import { $ } from './dom-utils'

export function getHistoryProfiles () {
  let history = { profiles: [] }
  if (localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'))
  }
  return history.profiles
}

export function addProfileToHistory (profile) {
  const profiles = getHistoryProfiles()
  profiles.push(profile)
  setProfilesHistory(profiles)
}

export function removeProfileFromHistory (profileId) {
  const profiles = getHistoryProfiles()
  profiles.splice(profileId, 1)
  setProfilesHistory(profiles)
}

function setProfilesHistory (profiles) {
  localStorage.setItem('history', JSON.stringify({ profiles: profiles }))
}

export function displayHistoryProfiles () {
  const table = $('#profile-history .profiles')
  const info = $('#profile-history .message')

  let html = ''
  table.innerHTML = html
  const profiles = getHistoryProfiles()
  if (profiles.length === 0) {
    info.innerHTML = '<p>Vous n\'avez généré aucune attestation depuis cet appareil ou ce navigateur.</p>' +
      '<p>Générez une première attestation pour pouvoir la réutiliser ici lors de vos prochains déplacements.</p>'
  } else {
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i]
      info.innerHTML = '<p>L\'attestation générée portera comme information de sortie, l\'heure et la date actuelles.</p>'

      const reasons = profile.reasons.split('-')
      let reasonsHtml = ''
      for (let j = 0; j < reasons.length; j++) {
        reasonsHtml += `<span class="badge badge-danger mr-1">${reasons[j]}</span>`
      }

      html += `<li class="list-group-item">
      <button class="float-right btn text-muted card-link remove-profile" data-id="${i}"><i class="fa fa-times"></i></button>
      <h5 class="card-title mb-0">${profile.firstname} ${profile.lastname}</h5>
      <small class="card-subtitle mb-2 text-muted">Né(e) le ${profile.birthday} à ${profile.placeofbirth}</small>
      <p class="card-text">
      ${profile.address}<br />
      ${profile.zipcode}, ${profile.city}
      </p>
      <p class="float-left">${reasonsHtml}</p>
      <button class="float-right generate-attestation btn btn-sm btn-primary" data-id="${i}"><i class="fa fa-file-pdf"></i> Générer l'attestation</button>
      <div class="clearfix"></div>
    </li>`
      table.innerHTML = html
    }
  }
}
