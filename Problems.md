*Issue List*

<table>

<thead>
    <th>Issue</th>
    <th>Solution</th>
</thead>

<tr>
    <td>Reading the element that triggered submit event in a form, when there are multiple submit buttons in it.</td>
    <td><span style="text-wrap:nowrap">event.nativeEvent.submitter.{name_of_button}.value</span></td>
</tr>
<tr>
    <td>To move ahead with requesting posts, editing posts, i need to verify the identity of the user during the request.</td>
    <td>Applying diffie hellman for an exchange of session id, and adding hmac using the session key (not sent with the request) to the request. Server checks if hash matches the hmac and then tends to the request</td>
</tr>

</table>



