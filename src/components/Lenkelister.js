import React, { Component } from 'react';


class Lenkelister extends Component {
  render() {
    return (
        <section class="tjenester clearfix">
            <ul class="lenkelister">
                <li class="lenkeliste">
                    <a href="https://tjenester-t4.nav.no/veiledning/veivalg" data-ga="Dittnav/Lenkeliste">
                        Veivalg
                    </a>
                </li>
                <li class="lenkeliste">
                    <a href="https://tjenester-t4.nav.no/veiledning/interessetest" data-ga="Dittnav/Lenkeliste">
                        Interessetesten
                    </a>
                </li>
                <li class="lenkeliste">
                    <a href="https://tjenester-t4.nav.no/sbl/arbeid/registrering" data-ga="Dittnav/Lenkeliste">
                        Registrer deg som arbeidssøker
                    </a>
                </li>
                <li class="lenkeliste">
                    <a href="/mininnboks" data-ga="Dittnav/Lenkeliste">
                        Min innboks
                    </a>
                </li>
                <li class="lenkeliste">
                    <a href="/saksoversikt" data-ga="Dittnav/Lenkeliste">
                        Innsyn og oversikt
                    </a>
                </li>
            </ul>
        </section>
    );
  }
}

export default Lenkelister;
