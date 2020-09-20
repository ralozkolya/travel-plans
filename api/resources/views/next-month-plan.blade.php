<style>

    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    table, th, td {
        border: 1px solid black;
    }

    th, td {
        padding: 10px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        text-align: left;
    }

    .wide {
        min-width: 100px;
    }

    .narrow {
        width: 10px;
    }

    .printed-on, h3 {
        margin-top: 20px;
        color: gray;
    }

</style>

<h1>Travel plans for the next month</h1>

<h3>From {{ $start }} to {{ $end }}</h3>

<h3>Username: {{ $user->name }} ({{ $user->email }})</h3>

<table>
    <thead>
        <tr>
            <th>Destination</th>
            <th class="wide">Start date</th>
            <th class="wide">End date</th>
            <th class="narrow">Days left</th>
            <th>Comment</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($trips as $trip)
        <tr>
            <td>{{ $trip->destination }}</td>
            <td>{{ $trip->start_date }}</td>
            <td>{{ $trip->end_date }}</td>
            <td>{{ $trip->days_left ? $trip->days_left : 'Ongoing' }}</td>
            <td>{{ $trip->comment ? $trip->comment : '(No comment)' }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

<div class="printed-on">Printed on: {{ date('Y-m-d h:i:s', strtotime('now')) }}</div>
