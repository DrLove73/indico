/* This file is part of Indico.
 * Copyright (C) 2002 - 2018 European Organization for Nuclear Research (CERN).
 *
 * Indico is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * Indico is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Indico; if not, see <http://www.gnu.org/licenses/>.
 */

import _ from 'lodash';
import {createSelector} from 'reselect';
import {RequestState} from 'indico/utils/redux';


const makeSorter = attr => (a, b) => a[attr].localeCompare(b[attr]);


const _getAllLocations = ({admin}) => admin.locations;
export const getAllLocations = createSelector(
    _getAllLocations,
    locations => locations.sort(makeSorter('name'))
);
export const isFetchingLocations = ({admin}) => admin.requests.locations.state === RequestState.STARTED;
export const getFilters = ({admin}) => admin.filters;

export const _getEquipmentTypes = ({admin}) => admin.equipmentTypes;
export const _getFeatures = ({admin}) => admin.features;
const _getFeaturesMap = createSelector(
    _getFeatures,
    features => _.fromPairs(features.map(feat => [feat.id, feat])),
);

export const getEquipmentTypes = createSelector(
    _getEquipmentTypes,
    _getFeaturesMap,
    (equipmentTypes, featuresMap) => {
        return equipmentTypes.map(eq => ({
            ...eq,
            features: eq.features.map(id => featuresMap[id]).sort(makeSorter('title'))
        })).sort(makeSorter('name'));
    }
);

export const getFeatures = createSelector(
    _getEquipmentTypes,
    _getFeatures,
    (equipmentTypes, features) => {
        return features
            .map(feat => ({
                ...feat,
                numEquipmentTypes: equipmentTypes.filter(eq => eq.features.includes(feat.id)).length,
            }))
            .sort(makeSorter('title'));
    }
);

export const isFetchingFeaturesOrEquipmentTypes = ({admin}) => (
    admin.requests.equipmentTypes.state === RequestState.STARTED ||
    admin.requests.features.state === RequestState.STARTED
);
