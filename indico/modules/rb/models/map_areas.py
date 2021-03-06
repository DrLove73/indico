# This file is part of Indico.
# Copyright (C) 2002 - 2018 European Organization for Nuclear Research (CERN).
#
# Indico is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 3 of the
# License, or (at your option) any later version.
#
# Indico is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Indico; if not, see <http://www.gnu.org/licenses/>.

from __future__ import unicode_literals

from indico.core.db import db
from indico.util.string import format_repr, return_ascii


class MapArea(db.Model):
    __tablename__ = 'map_areas'
    __table_args__ = (db.Index(None, 'is_default', unique=True, postgresql_where=db.text('is_default')),
                      {'schema': 'roombooking'})

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    name = db.Column(
        db.String,
        nullable=False
    )
    is_default = db.Column(
        db.Boolean,
        nullable=False,
        default=False
    )
    top_left_latitude = db.Column(
        db.Float,
        nullable=False
    )
    top_left_longitude = db.Column(
        db.Float,
        nullable=False
    )
    bottom_right_latitude = db.Column(
        db.Float,
        nullable=False
    )
    bottom_right_longitude = db.Column(
        db.Float,
        nullable=False
    )

    @return_ascii
    def __repr__(self):
        return format_repr(self, 'id', 'name', is_default=False)
